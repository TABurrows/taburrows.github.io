---
title: Database - Terraform
category: Google Cloud
order: 1
---
Database - Terraform


Declarative syntax

```

resource "google_compute_firewall" "public-allow-ssh" {
    name = "${google_compute_network.public-vpc.name}-allow-ssh"
    network = "${google_compute_network.public-vpc.name}"
    allow {
        protocol = "tcp"
        ports = [ "22" ]
    }
    source_ranges = [ "0.0.0.0/0" ]
    target_tags = [ "allow-ssh" ]
}

resourcs "google_compute_instance" "sql-client" {

    name = "sql-client-${random_id.instance_id.hex}"
    machine_type = "f1-micro"
    zone = var.gcp_zone_1

    tags = [ "allow-ssh" ]

    boot_disk {
        initialize_params {
            image = "debian-cloud/debian11"
        }
    }

    metadata_startup_script = "sudo apt-get update;"

    network_interface {
        network = google_compute_network.public-vpc.name
        subnetwork = google_compute_subnetwork.public-subnet_1.name
        access_config {
            # leave empty for emphemeral external ip
        }
    }

}

```