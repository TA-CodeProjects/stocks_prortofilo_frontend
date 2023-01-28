class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    auth: "http://localhost:8080/api/auth/",
    user: "http://localhost:8080/api/user/",
    stocks: "http://localhost:8080/api/stocks/",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    auth: "http://localhost:8080/api/auth/",
    user: "http://localhost:8080/api/user/",
    stocks: "http://localhost:8080/api/stocks/",
  };
}

const globals = process.env.NODE_ENV !== 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;