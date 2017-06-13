
defmodule Osame.ApiError do
  defstruct [:type, :message]

  alias Osame.ApiError

  def new(:internal_server_error) do
    %ApiError{
      type: "INTERNAL_ERROR",
      message: "Internal Server error."
    }
  end

  def new(:unauthenticated) do
    %ApiError{
      type: "UNAUTHENTICATED",
      message: "You are not authenticated."
    }
  end

  def new(:login_failed) do
   %ApiError{
     type: "LOGIN_FAILED",
      message: "Invalid username/email or password."
    }
  end

  def new(:login_user_not_found), do: new(:login_failed)
  def new(:login_bad_password), do: new(:login_failed)

  def new(:register_bad_entity) do
   %ApiError{
     type: "REGISTER_FAILED",
      message: "Username or email already taken."
    }
  end

  def new(:login_token_encode), do: new(:internal_server_error)
end
