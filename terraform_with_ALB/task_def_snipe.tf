resource "aws_cloudwatch_log_group" "ecs_task" {
  name = "node"
}


resource "aws_ecs_task_definition" "node-main" {
  family                   = "my_node_test-main"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 512
  memory                   = 1024
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
#   container_definitions    = data.template_file.testapp.rendered
   container_definitions    = <<TASK_DEFINITION
 [
    {
      "dnsSearchDomains": null,
      "environmentFiles": null,
      "logConfiguration": {
        "logDriver": "awslogs",
        "secretOptions": null,
        "options": {
          "awslogs-group": "${aws_cloudwatch_log_group.ecs_task.name}",
          "awslogs-region": "ap-south-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "entryPoint": null,
      "portMappings":[
        {
          "hostPort": 80,
          "protocol": "tcp",
          "containerPort": 80
        }
      ],
      "command": null,
      "linuxParameters": null,
      "cpu": 0,
      "environment": [
        {
          "name": "RUNNER_NAME",
          "value": "pd-gh-runner" 
        },
        {
          "name": "RUNNER_LABELS",
          "value": "test1,test2"
        },
                {
          "name": "GITHUB_OWNER",
          "value": "PearlThoughts-GitHub-Actions"
        }
      ],
      "resourceRequirements": null,
      "ulimits": null,
      "dnsServers": null,
      "mountPoints": null,
      "workingDirectory": null,
      "secrets": null,
      "dockerSecurityOptions": null,
      "memory": null,
      "memoryReservation": null,
      "volumesFrom": [],
      "stopTimeout": null,
      "image":  "${data.aws_ecr_repository.example.repository_url}:${data.external.current_image.result["image_tag"]}",
      "startTimeout": null,
      "firelensConfiguration": null,
      "dependsOn": null,
      "disableNetworking": null,
      "interactive": null,
      "healthCheck": null,
      "essential": true,
      "links": [],
      "hostname": null,
      "extraHosts": null,
      "pseudoTerminal": null,
      "user": null,
      "readonlyRootFilesystem": null,
      "dockerLabels": null,
      "systemControls": null,
      "privileged": null,
      "name": "testapp"
    }
  ]
TASK_DEFINITION

  runtime_platform {
    operating_system_family = "LINUX"
    
  }
  #  volume {
  #   name      = "selfhosted-vol"
  #   # host_path = "/ecs/service-storage"
  # }
}



resource "aws_ecs_service" "test-service-node-main" {
  name            = "testapp-service-node-main"
  cluster         = aws_ecs_cluster.foo.id
  task_definition = aws_ecs_task_definition.node-main.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_sg-80.id]
    subnets          = data.aws_subnets.subnet.ids
    assign_public_ip = true
  }
    load_balancer {
    target_group_arn = module.rohan-alb.elb-target-group-arn
    container_name   = "testapp"
    container_port   = 80
  }

  #depends_on = [aws_iam_role_policy_attachment.ecs_task_execution_role, aws_ecs_service.test-service-mysql]
}

data "aws_ecr_repository" "example" {
  name = "node"
}
# data "aws_ecr_image" "service_image" {
#   repository_name = "node"
#   image_tag = "master"
# }
# output "ecr_image" {
#   value = data.aws_ecr_image.service_image.image_tag
# }


data "external" "current_image" {
  program = ["bash", "./ecs-task-definition.sh"]
  # query = {
  #   app  = "testapp-service-node-main"
  #   cluster = "node-cluster"
  #   # path_root = "${jsonencode(path.root)}"
  # }
}
# output "get_new_tag" {
#   value = data.external.current_image.result["image_tag"]
# }
