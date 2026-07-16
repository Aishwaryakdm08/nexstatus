module "ec2" {
  source = "./modules/ec2"

  ami                  = var.ami_id
  instance_type        = var.instance_type
  subnet_id            = var.subnet_id
  security_group_ids   = [var.ec2_security_group]
  iam_instance_profile = var.iam_instance_profile
  name                 = var.ec2_name
}

module "security_groups" {
  source = "./modules/security_groups"

  ec2_name = "nexstatus-ec2-sg"
  vpc_id   = var.vpc_id
}

module "rds" {
  source = "./modules/rds"

  identifier = var.db_identifier

  engine = var.db_engine

  instance_class = var.db_instance_class

  allocated_storage = var.db_allocated_storage

  db_subnet_group_name = var.db_subnet_group_name

  security_group_ids = [var.db_security_group]

  publicly_accessible = var.db_publicly_accessible

  multi_az = var.db_multi_az
}
