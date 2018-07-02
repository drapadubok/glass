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

  forward("/graphql", Absinthe.Plug, schema: GlassWeb.Schema)

  forward(
    "/graphiql",
    Absinthe.Plug.GraphiQL,
    schema: GlassWeb.Schema,
    interface: :simple
  )

  resources("/branches", GlassWeb.BranchController, except: [:new, :edit])
  resources("/sources", GlassWeb.SourceController, except: [:new, :edit])
  resources("/events", GlassWeb.EventController, except: [:new, :edit])
  resources("/properties", GlassWeb.PropertyController, except: [:new, :edit])
end
