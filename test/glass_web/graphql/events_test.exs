defmodule PlateSlateWeb.Schema.Query.MenuItemsTest do
  use PlateSlateWeb.ConnCase, async: true

  setup do
    PlateSlate.Seeds.run()
  end

  @query """
    {
      menuItems {
        name
      }
    }
  """
  test "menuItems field returns menu items" do
    conn = build_conn()
    conn = get(conn, "/api", query: @query)

    assert json_response(conn, 200) == %{
             "data" => %{
               "menuItems" => [
                 %{"name" => "Reuben"},
                 %{"name" => "Croque Monsieur"},
                 %{"name" => "Muffuletta"}
                 # «Rest of items»
               ]
             }
           }
  end
end


mutation {
  createEvent(
    name: "newEvent",
    description: "shit shit",
    propertiesInput: [
      {name: "p1"},
      {name: "p2"}
    ]
  ) {
    id
  }
}
