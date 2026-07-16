resource "aws_db_instance" "mysql" {
  identifier        = var.identifier
  engine            = var.engine
  instance_class    = var.instance_class
  allocated_storage = var.allocated_storage

  db_subnet_group_name   = var.db_subnet_group_name
  vpc_security_group_ids = var.security_group_ids

  publicly_accessible = var.publicly_accessible
  multi_az            = var.multi_az

  skip_final_snapshot = true

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name = var.identifier
  }
}
