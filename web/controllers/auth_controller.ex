defmodule Osame.AuthController do
  use Osame.Web, :controller

  alias Osame.AuthHelper
  alias Osame.{ApiError, ErrorView}

  def login(con, %{"identifier" => identifier, "password" => password}) do
    with {:ok, user} <- AuthHelper.authenticate(identifier, password),
         {:ok, jwt, claims} = AuthHelper.encode_and_sign(user) do
      {:ok, %{user: user, jwt: jwt, claims: claims}}
    end
    |> case do
      {:ok, result} -> render(con, :login_success, result)
      {:error, error_type} ->
        con
        |> put_status(:unauthorized)
        |> render(ErrorView, :error, api_error: ApiError.new(error_type))
    end
  end

  def register(con, registration_params) do
    with {:ok, user} <- AuthHelper.register(registration_params),
         {:ok, jwt, claims} = AuthHelper.encode_and_sign(user) do
      {:ok, %{user: user, jwt: jwt, claims: claims}}
    end
    |> case do
      {:ok, result} -> render(con, :login_success, result)
      {:error, error_type} ->
        con
        |> put_status(:unauthorized)
        |> render(ErrorView, :error, api_error: ApiError.new(error_type))
    end
  end

  def unauthenticated(con, _params) do
    con
    |> put_status(:unauthorized)
    |> render(ErrorView, :error, api_error: ApiError.new(:unauthenticated))
  end
end

