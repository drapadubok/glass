defmodule GlassWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Ecto, repo: Glass.Repo

  import_types(Absinthe.Type.Custom)
  import_types(GlassWeb.Schema.EventTypes)
  import_types(GlassWeb.Schema.AuthTypes)

  alias GlassWeb.Resolvers

  query do
    field :branches, list_of(:branch) do
      resolve(&Resolvers.Events.all_branches/2)
    end

    field :sources, list_of(:source) do
      resolve(&Resolvers.Events.all_sources/2)
    end

    field :events, list_of(:event) do
      resolve(&Resolvers.Events.all_events/2)
    end

    field :properties, list_of(:property) do
      resolve(&Resolvers.Events.all_properties/2)
    end

    field :branch, type: :branch do
      arg(:name, non_null(:string))
      resolve(&Resolvers.Events.find_branch/3)
    end
  end

  mutation do
    field :create_event, :event do
      arg(:name, non_null(:string))
      arg(:description, non_null(:string))
      arg(:properties_input, list_of(non_null(:property_input)))
      resolve(&Resolvers.Events.create_event/3)
    end

    field :create_branch, :branch do
      arg(:name, non_null(:string))
      resolve(&Resolvers.Events.create_branch/3)
    end

    field :signup_user, :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))
      resolve(&Resolvers.Auth.signup_user/3)
    end

    field :signin_user, :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))
      resolve(&Resolvers.Auth.signin_user/3)
    end

    field :signout_user, :result do
      arg(:token, non_null(:string))
      resolve(&Resolvers.Auth.signout_user/3)
    end
  end
end
