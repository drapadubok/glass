# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :glass, ecto_repos: [Glass.Repo]

# Configures the endpoint
config :glass, GlassWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "LJ7oeQO+mPQGtPFaF/FnqbXUbhkhWbHQWmWGRuputatoz0Nq8bziUodGCgRxQ1rX",
  render_errors: [view: GlassWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Glass.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Authentication lib config
config :glass, Glass.Auth.Guardian,
  issuer: "Glass.#{Mix.env()}",
  ttl: {60, :minutes},
  token_ttl: %{
    "magic" => {30, :minutes},
    "access" => {1, :days}
  },
  verify_issuer: true,
  # System.get_env("GUARDIAN_SECRET_KEY")
  secret_key: "A very secret key"

# Mailing service config
config :glass, Glass.Auth.Mailer,
  adapter: Bamboo.SendgridAdapter,
  api_key: System.get_env("SENDGRID_API_KEY")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
