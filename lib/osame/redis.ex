
defmodule Osame.Redis do
  use Supervisor

  @pool_size 10

  def start_link do
    Supervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  def command(command) do
    Redix.command(:"redix_#{random_index()}", command)
  end

  def command!(command) do
    Redix.command!(:"redix_#{random_index()}", command)
  end

  defp random_index do
    rem(System.unique_integer([:positive]), @pool_size)
  end

  def init([]) do
    redix_workers = for i <- 0..(@pool_size - 1) do
      worker(Redix, [[], [name: :"redix_#{i}"]], id: {Redix, i})
    end

    opts = [strategy: :one_for_one, name: Osame.Redis.Supervisor]
    supervise(redix_workers, opts)
  end
end
