defmodule Glass.EventsTest do
  use Glass.DataCase

  alias Glass.Events

  describe "branches" do
    alias Glass.Events.Branch

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def branch_fixture(attrs \\ %{}) do
      {:ok, branch} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Events.create_branch()

      branch
    end

    test "list_branches/0 returns all branches" do
      branch = branch_fixture()
      assert Events.list_branches() == [branch]
    end

    test "get_branch!/1 returns the branch with given id" do
      branch = branch_fixture()
      assert Events.get_branch!(branch.id) == branch
    end

    test "create_branch/1 with valid data creates a branch" do
      assert {:ok, %Branch{} = branch} = Events.create_branch(@valid_attrs)
      assert branch.name == "some name"
    end

    test "create_branch/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Events.create_branch(@invalid_attrs)
    end

    test "update_branch/2 with valid data updates the branch" do
      branch = branch_fixture()
      assert {:ok, branch} = Events.update_branch(branch, @update_attrs)
      assert %Branch{} = branch
      assert branch.name == "some updated name"
    end

    test "update_branch/2 with invalid data returns error changeset" do
      branch = branch_fixture()
      assert {:error, %Ecto.Changeset{}} = Events.update_branch(branch, @invalid_attrs)
      assert branch == Events.get_branch!(branch.id)
    end

    test "delete_branch/1 deletes the branch" do
      branch = branch_fixture()
      assert {:ok, %Branch{}} = Events.delete_branch(branch)
      assert_raise Ecto.NoResultsError, fn -> Events.get_branch!(branch.id) end
    end

    test "change_branch/1 returns a branch changeset" do
      branch = branch_fixture()
      assert %Ecto.Changeset{} = Events.change_branch(branch)
    end
  end

  describe "sources" do
    alias Glass.Events.Source

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def source_fixture(attrs \\ %{}) do
      {:ok, source} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Events.create_source()

      source
    end

    test "list_sources/0 returns all sources" do
      source = source_fixture()
      assert Events.list_sources() == [source]
    end

    test "get_source!/1 returns the source with given id" do
      source = source_fixture()
      assert Events.get_source!(source.id) == source
    end

    test "create_source/1 with valid data creates a source" do
      assert {:ok, %Source{} = source} = Events.create_source(@valid_attrs)
      assert source.name == "some name"
    end

    test "create_source/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Events.create_source(@invalid_attrs)
    end

    test "update_source/2 with valid data updates the source" do
      source = source_fixture()
      assert {:ok, source} = Events.update_source(source, @update_attrs)
      assert %Source{} = source
      assert source.name == "some updated name"
    end

    test "update_source/2 with invalid data returns error changeset" do
      source = source_fixture()
      assert {:error, %Ecto.Changeset{}} = Events.update_source(source, @invalid_attrs)
      assert source == Events.get_source!(source.id)
    end

    test "delete_source/1 deletes the source" do
      source = source_fixture()
      assert {:ok, %Source{}} = Events.delete_source(source)
      assert_raise Ecto.NoResultsError, fn -> Events.get_source!(source.id) end
    end

    test "change_source/1 returns a source changeset" do
      source = source_fixture()
      assert %Ecto.Changeset{} = Events.change_source(source)
    end
  end

  describe "events" do
    alias Glass.Events.Event

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def event_fixture(attrs \\ %{}) do
      {:ok, event} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Events.create_event()

      event
    end

    test "list_events/0 returns all events" do
      event = event_fixture()
      assert Events.list_events() == [event]
    end

    test "get_event!/1 returns the event with given id" do
      event = event_fixture()
      assert Events.get_event!(event.id) == event
    end

    test "create_event/1 with valid data creates a event" do
      assert {:ok, %Event{} = event} = Events.create_event(@valid_attrs)
      assert event.name == "some name"
    end

    test "create_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Events.create_event(@invalid_attrs)
    end

    test "update_event/2 with valid data updates the event" do
      event = event_fixture()
      assert {:ok, event} = Events.update_event(event, @update_attrs)
      assert %Event{} = event
      assert event.name == "some updated name"
    end

    test "update_event/2 with invalid data returns error changeset" do
      event = event_fixture()
      assert {:error, %Ecto.Changeset{}} = Events.update_event(event, @invalid_attrs)
      assert event == Events.get_event!(event.id)
    end

    test "delete_event/1 deletes the event" do
      event = event_fixture()
      assert {:ok, %Event{}} = Events.delete_event(event)
      assert_raise Ecto.NoResultsError, fn -> Events.get_event!(event.id) end
    end

    test "change_event/1 returns a event changeset" do
      event = event_fixture()
      assert %Ecto.Changeset{} = Events.change_event(event)
    end
  end

  describe "properties" do
    alias Glass.Events.Property

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def property_fixture(attrs \\ %{}) do
      {:ok, property} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Events.create_property()

      property
    end

    test "list_properties/0 returns all properties" do
      property = property_fixture()
      assert Events.list_properties() == [property]
    end

    test "get_property!/1 returns the property with given id" do
      property = property_fixture()
      assert Events.get_property!(property.id) == property
    end

    test "create_property/1 with valid data creates a property" do
      assert {:ok, %Property{} = property} = Events.create_property(@valid_attrs)
      assert property.name == "some name"
    end

    test "create_property/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Events.create_property(@invalid_attrs)
    end

    test "update_property/2 with valid data updates the property" do
      property = property_fixture()
      assert {:ok, property} = Events.update_property(property, @update_attrs)
      assert %Property{} = property
      assert property.name == "some updated name"
    end

    test "update_property/2 with invalid data returns error changeset" do
      property = property_fixture()
      assert {:error, %Ecto.Changeset{}} = Events.update_property(property, @invalid_attrs)
      assert property == Events.get_property!(property.id)
    end

    test "delete_property/1 deletes the property" do
      property = property_fixture()
      assert {:ok, %Property{}} = Events.delete_property(property)
      assert_raise Ecto.NoResultsError, fn -> Events.get_property!(property.id) end
    end

    test "change_property/1 returns a property changeset" do
      property = property_fixture()
      assert %Ecto.Changeset{} = Events.change_property(property)
    end
  end
end
