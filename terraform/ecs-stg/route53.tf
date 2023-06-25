# data "aws_route53_zone" "primary" {
#   name         = var.domain_name
#   #private_zone = true
# }

# resource "aws_route53_record" "www" {
#   zone_id = data.aws_route53_zone.primary.zone_id
#   name    = "api.${var.domain_name}"
#   type    = "A"

#   alias {
#     name                   = data.aws_lb.backend.dns_name
#     zone_id                = data.aws_lb.backend.zone_id
#     evaluate_target_health = true
#   }
# }