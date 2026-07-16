variable "aws_region" {
  default = "ap-south-1"
}

variable "ec2_name" {
  default = "nexstatus-backend"
}

variable "instance_type" {
  default = "t3.micro"
}

variable "ami_id" {
  default = "ami-01a18c38ece67e620"
}

variable "subnet_id" {
  default = "subnet-0cbc74eb1a108f5aa"
}

variable "ec2_security_group" {
  default = "sg-0ece5d6e6246783fb"
}

variable "iam_instance_profile" {
  default = "NexStatus-EC2-CloudWatch-Role"
}

variable "vpc_id" {}

variable "db_identifier" {}

variable "db_engine" {}

variable "db_instance_class" {}

variable "db_allocated_storage" {}

variable "db_subnet_group_name" {}

variable "db_security_group" {}

variable "db_publicly_accessible" {}

variable "db_multi_az" {}
