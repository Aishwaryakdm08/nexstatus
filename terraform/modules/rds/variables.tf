variable "identifier" {}

variable "engine" {}

variable "instance_class" {}

variable "allocated_storage" {}

variable "db_subnet_group_name" {}

variable "security_group_ids" {
  type = list(string)
}

variable "publicly_accessible" {}

variable "multi_az" {}
