# data "aws_ecr_repository" "app" {
#   name = "optimus-development-app"
# }

data "aws_ecr_repository" "optimus" {
  name = "rewards-bot-stg"
}

# data "aws_ecr_repository" "redis" {
#   name = "reworking-development-redis"
# }



