defmodule GlassWeb.Router do
  use GlassWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :auth do
    plug(Glass.Auth.Pipeline)
  end

  pipeline :ensure_auth do
    plug(Guardian.Plug.EnsureAuthenticated)
  end

  scope "/api", GlassWeb do
    pipe_through([:api, :auth])

    post("/login", ApiAuthController, :login)
    post("/logout", ApiAuthController, :logout)
  end

  scope "/graphql" do
    pipe_through([:api, :auth])

    forward("/", Absinthe.Plug, schema: GlassWeb.Schema)
  end

  forward("/graphiql", Absinthe.Plug.GraphiQL, schema: GlassWeb.Schema)
end
