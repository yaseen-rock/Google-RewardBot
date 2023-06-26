provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      ManagedBy = "terraform"
      Workspace = terraform.workspace
      Project   = var.ProjectName
    }
  }
}

terraform {
  backend "s3" {
    bucket = "rewards-bot-prod"
    key = "rewards-bot-prod/terraform.tfstate"
    region = "us-east-1"
}
}




