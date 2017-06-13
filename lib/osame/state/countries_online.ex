
defmodule Osame.CountriesOnline do
  use GenServer

  ## Client

  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def add(socket) do
    pid = socket.transport_pid
    user = socket.assigns[:user]
    GenServer.call(__MODULE__, {:track, pid, user})
  end

  def online do
    GenServer.call(__MODULE__, :countries_online)
  end

  ## Server

  def init([]) do
    Process.flag(:trap_exit, true)
    {:ok, %{pids: %{}, countries_online: %{}}}
  end

  def handle_call({:track, pid, user}, _from, state) do
    Process.link(pid)
    new_pids = Map.put(state.pids, pid, user.country_id)
    new_countries_online = Map.update(state.countries_online, user.country_id, 1, fn c -> c + 1 end)
    {:reply, :ok, %{pids: new_pids, countries_online: new_countries_online}}
  end

  def handle_call(:countries_online, _from, state) do
    countries_id = Enum.filter_map(state.countries_online,
      fn {_country_id, count} -> count > 0 end,
      fn {country_id, _users_count} -> country_id end)

    {:reply, countries_id, state}
  end

  def handle_info({:EXIT, pid, _reason}, state) do
    {user_country_id, new_pids} = Map.pop(state.pids, pid)
    new_countries_online = Map.update!(state.countries_online, user_country_id, fn c -> c - 1 end)
    {:noreply, %{pids: new_pids, countries_online: new_countries_online}}
  end
end

