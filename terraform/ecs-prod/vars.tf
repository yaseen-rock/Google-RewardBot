variable "region" {
  default = "us-east-1"
}
variable "ProjectName" {
  default = "optimus"
}
variable "tf_backend_bucket_name" {
  default = "rewards-bot-prod"
}
variable "environment" {
  description = "Deployment Environment"
  default = "production"
}
variable "as_max_count" {
  type = number
  default = 2
}
variable "allow_overwrite" {
  type = bool
  default = true
}
variable "source_branch_name" {
  default = "development"
}

variable "domain_name" {
  default = "active-steps-app.com"
}
# variable "cloudflare_zone_id" {}

variable "task_count" {
  type = number
  default = 1
}
variable "container_port" {
  type = number
  default = 9000
}

variable "optimus_container_port" {
  type    = number
  default = 80
}
variable "redis_container_port" {
  type    = number
  default = 6379
}

variable "secret_manager_arn" {
  default = "arn:aws:secretsmanager:us-east-1:025212946569:secret:dev/env-jVIVCa"
}

# variable "codebuild_bucket" {
#   default = "reworkingiac-backendstate-file"
# }
# variable "codepipeline_bucket" {
#   default = "reworkingiac-backendstate-file"
# }