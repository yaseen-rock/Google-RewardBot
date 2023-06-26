# Find a certificate issued by (not imported into) ACM
data "aws_acm_certificate" "cert" {
  domain      = var.domain_name
  types       = ["AMAZON_ISSUED"]
  most_recent = true
}



# resource "aws_acm_certificate" "cert" {
#   # api-gateway / cloudfront certificates need to use the us-east-1 region
#   domain_name               = var.domain_name
#   subject_alternative_names = ["*.${var.domain_name}"]
#   validation_method         = "DNS"
# }

# resource "cloudflare_record" "cert_validation" {
#   zone_id         = var.cloudflare_zone_id
#   name            = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_name
#   value           = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_value
#   type            = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_type
#   ttl             = 1
#   allow_overwrite = var.allow_overwrite
# }

resource "aws_acm_certificate_validation" "cert" {
  # api-gateway / cloudfront certificates need to use the us-east-1 region
  certificate_arn = data.aws_acm_certificate.cert.arn
  timeouts {
    create = "45m"
  }
}
 