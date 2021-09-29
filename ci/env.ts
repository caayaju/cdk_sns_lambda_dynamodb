export enum Env {
    dev = "dev",
    uat = "uat",
    prod = "prod",
  }
  
  export function capitalizeEnv(env: Env): string {
    switch (env) {
      case "dev": return "Dev";
      case "uat": return "Uat";
      case "prod": return "Prod";
      default: throw new Error(`unknown env: ${env}`);
    }
  }
  