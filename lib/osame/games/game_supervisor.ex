
defmodule Osame.GameSupervisor do
  use Supervisor

  alias Osame.Game

  # Client

  def start_link do
    Supervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  def create_game(first_country, second_country) do
    game = Game.new(first_country, second_country)
    {:ok, game_pid} = Supervisor.start_child(__MODULE__, [game])
  end

  def games do
    Supervisor.which_children(__MODULE__)
    |> Enum.map(fn {_id, pid, _type, _modules} -> GenServer.call(pid, :game) end)
  end

  def countries_playing do
    Supervisor.which_children(__MODULE__)
    |> Enum.flat_map(fn {_id, pid, _type, _modules} -> GenServer.call(pid, :countries_playing) end)
  end

  # Server

  def init([]) do
    children = [
      worker(Osame.Game, [], restart: :temporary),
    ]

    opts = [strategy: :simple_one_for_one, name: Osame.Games]
    supervise(children, opts)
  end
end
