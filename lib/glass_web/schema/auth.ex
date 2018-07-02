defmodule GlassWeb.Schema.AuthTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Glass.Repo

  @desc "A user"
  object :user do
    field(:id, :id)
    field(:email, :string)
  end

  @desc "A session"
  object :session do
    field(:token, :string)
  end
end
