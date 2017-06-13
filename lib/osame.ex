defmodule Osame do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      # Phoenix
      supervisor(Osame.Repo, []),
      supervisor(Osame.Endpoint, []),

      # Games
      supervisor(Osame.GameSupervisor, []),
      worker(Osame.GameCreator, []),

      worker(Osame.UsersOnline, []),
      worker(Osame.CountriesOnline, []),
      worker(Osame.ChatMessages, []),

      # Redis
      supervisor(Osame.Redis, []),
    ]

    opts = [strategy: :one_for_one, name: Osame.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Osame.Endpoint.config_change(changed, removed)
    :ok
  end
end
