# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :osame,
  namespace: Osame,
  ecto_repos: [Osame.Repo]

# Configures the endpoint
config :osame, Osame.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "TsqO9JQi7+3apk0Ki4hXlmqWP6HqPskLgZmdLzE4ispwchd1lKEatzzcigJA7XEr",
  render_errors: [view: Osame.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Osame.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures Guardian
config :guardian, Guardian,
  allowed_algos: ["HS256"],
  verify_module: Guardian.JWT,
  issuer: "Osame",
  ttl: {30, :days},
  verify_issuer: true,
  secret_key: %{"k" => "sahbYsG4uJSRlwboh7ArpQ", "kty" => "oct"},
  serializer: Osame.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
