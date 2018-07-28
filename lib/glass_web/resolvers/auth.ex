defmodule GlassWeb.Resolvers.Auth do
  alias Glass.Auth
  alias Glass.Auth.Guardian

  def signup_user(_root, %{email: email, password: password} = args, _info) do
    with {:ok, _user} <- Auth.create_user(args),
         {:ok, user} <- Auth.authenticate_user(email, password) do
      {:ok, token, _claims} = Guardian.encode_and_sign(user)
      {:ok, %{token: token}}
    end
    |> case do
      {:error, error} -> {:error, error}
      other -> other
    end
  end

  def signin_user(_root, %{email: email, password: password}, _info) do
    with {:ok, user} <- Auth.authenticate_user(email, password) do
      {:ok, token, _claims} = Guardian.encode_and_sign(user)
      {:ok, %{token: token}}
    end
    |> case do
      {:error, error} -> {:error, error}
      other -> other
    end
  end

  def signout_user(_root, %{token: token}, _info) do
    {:ok, claims} = Guardian.revoke(token)
  end
end
