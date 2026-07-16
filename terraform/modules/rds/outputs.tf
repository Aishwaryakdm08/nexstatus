output "db_identifier" {
  value = aws_db_instance.mysql.id
}

output "endpoint" {
  value = aws_db_instance.mysql.endpoint
}
