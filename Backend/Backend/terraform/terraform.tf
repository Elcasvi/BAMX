terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.52.0"
    }
  }
}
provider "azurerm" {
  features {}
}

# Create a resource group
resource "azurerm_resource_group" "bamx-rg" {
  name     = "bamx-rg"
  location = "East US"
}

# resource "azurerm_container_registry" "bamxcr" {
#   location            = azurerm_resource_group.bamx-rg.location
#   name                = "bamxcr"
#   resource_group_name = azurerm_resource_group.bamx-rg.name
#   sku                 = "Basic"
#   admin_enabled       = true
# }

resource "azurerm_service_plan" "bamx-service-plan" {
  location            = azurerm_resource_group.bamx-rg.location
  name                = "bamx-service-plan"
  resource_group_name = azurerm_resource_group.bamx-rg.name
  os_type             = "Linux"
  sku_name            = "F1"
}

resource "azurerm_linux_web_app" "bamx-app-service" {
  service_plan_id     = azurerm_service_plan.bamx-service-plan.id
  location            = azurerm_resource_group.bamx-rg.location
  name                = "bamx-app-service"
  resource_group_name = azurerm_resource_group.bamx-rg.name
  site_config {
    always_on = false
  }
}