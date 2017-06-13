
defmodule Osame.Utils do
  def random_string(size) do
    rand_bytes = :crypto.strong_rand_bytes(size)

    rand_bytes
    |> Base.url_encode64
    |> binary_part(0, size)
  end
end
