
defmodule Osame.UsersOnline do
  use GenServer

  ## Client

  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def add(socket) do
    pid = socket.transport_pid
    GenServer.call(__MODULE__, {:track, pid})
  end

  def count do
    GenServer.call(__MODULE__, :count)
  end

  ## Server

  def init([]) do
    Process.flag(:trap_exit, true)
    {:ok, 0}
  end

  def handle_call({:track, pid}, _from, users_count) do
    Process.link(pid)
    {:reply, :ok, users_count + 1}
  end

  def handle_call(:count, _from, users_count) do
    {:reply, users_count, users_count}
  end

  def handle_info({:EXIT, _pid, _reason}, users_count) do
    {:noreply, users_count - 1}
  end
end
