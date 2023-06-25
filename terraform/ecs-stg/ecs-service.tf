data "aws_ecs_cluster" "main" {
  cluster_name = local.common_name
}

resource "aws_cloudwatch_log_group" "ecs_task" {
  name = "${local.common_name}-ecs-task-backend"
}

resource "aws_ecs_service" "main" {
  name            = local.common_name
  cluster         = data.aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.service.family
  desired_count   = var.task_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.private_subnets_id.ids
    assign_public_ip = true
    security_groups  = [aws_security_group.ecs-task.id]
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.ecs.arn
    container_name   = "optimus"
    container_port   = var.optimus_container_port
  }
}

resource "aws_security_group" "ecs-task" {
  name        = "${local.common_name}-ecs-task-sg"
  description = "Default SG to allow traffic from the VPC"
  vpc_id      = data.aws_vpc.vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = "${var.environment}"
  }
}

resource "aws_ecs_task_definition" "service" {
  family                   = local.common_name
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 4096
  memory                   = 8192
  container_definitions = jsonencode([
    # {
    #   name  = "app"
    #   image = "${data.aws_ecr_repository.app.repository_url}:latest"

    #   essential = true
    #   portMappings = [
    #     {
    #       containerPort = var.container_port
    #       hostPort      = var.container_port
    #     }
    #   ]
    #   #secrets = local.secret
    #   logConfiguration = {
    #     logDriver = "awslogs",
    #     options = {
    #       awslogs-group         = "${aws_cloudwatch_log_group.ecs_task.name}",
    #       awslogs-region        = "${var.region}",
    #       awslogs-stream-prefix = "app"
    #     }
    #   }
    # },
     {
      name      = "optimus"
      image     = "${data.aws_ecr_repository.optimus.repository_url}:<changeme>"
      essential = true
      portMappings = [
        {
          containerPort = var.optimus_container_port
          hostPort      = var.optimus_container_port
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "${aws_cloudwatch_log_group.ecs_task.name}",
          awslogs-region        = "${var.region}",
          awslogs-stream-prefix = "optimus"
        }
      }
     }
    #,
    #    {
    #   name      = "redis"
    #   image     = "${data.aws_ecr_repository.redis.repository_url}:latest"
    #   essential = true
    #   portMappings = [
    #     {
    #       containerPort = var.redis_container_port
    #       hostPort      = var.redis_container_port
    #     }
    #   ]
    #   logConfiguration = {
    #     logDriver = "awslogs",
    #     options = {
    #       awslogs-group         = "${aws_cloudwatch_log_group.ecs_task.name}",
    #       awslogs-region        = "${var.region}",
    #       awslogs-stream-prefix = "redis"
    #     }
    #   }
    # }

  ])

}

resource "aws_iam_role" "ecs_task_role" {
  name = "${local.common_name}-ecsTaskRole"

  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}

resource "aws_iam_policy" "dynamodb" {
  name        = "${local.common_name}-task-policy-dynamodb"
  description = "Policy that allows access to DynamoDB"

  policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
                "s3:List*"
           ],
           "Resource": "*"
       }
   ]
}
EOF
}

resource "aws_iam_policy" "ecs_task_execution_role" {
  name        = "${local.common_name}-ecs_task_execution_role"
  description = "Policy that allows access to AWS Secrets"

  policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
                "secretsmanager:GetSecretValue"
           ],
           "Resource": "*"
       }

   ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs-task-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.dynamodb.arn
}
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ecs_task_execution_role.arn
}


resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${local.common_name}-ecsTaskExecutionRole"

  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
