defmodule Glass.Auth.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Glass.Auth.User
  alias Comeonin.Bcrypt

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type Ecto.UUID

  schema "users" do
    field(:email, :string)
    field(:is_admin, :boolean, default: false)
    field(:password, :string)
    field(:username, :string)

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :password, :username, :is_admin])
    |> validate_required([:email])
    |> unique_constraint(:email)
    |> put_password_hash()
  end

  defp put_password_hash(
         %Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset
       ) do
    change(changeset, password: Bcrypt.hashpwsalt(password))
  end

  defp put_password_hash(changeset), do: changeset
end
