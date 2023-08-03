require "application_system_test_case"

class AddressesTest < ApplicationSystemTestCase
  setup do
    @address = addresses(:one)
  end

  test "visiting the index" do
    visit addresses_url
    assert_selector "h1", text: "Addresses"
  end

  test "should create address" do
    visit addresses_url
    click_on "New address"

    fill_in "Attention", with: @address.attention
    fill_in "City", with: @address.city
    fill_in "Country", with: @address.country
    fill_in "Customer", with: @address.customer_id
    fill_in "Full address", with: @address.full_address
    fill_in "Latitude", with: @address.latitude
    fill_in "Line 1", with: @address.line_1
    fill_in "Line 2", with: @address.line_2
    fill_in "Line 3", with: @address.line_3
    fill_in "Line 4", with: @address.line_4
    fill_in "Longitude", with: @address.longitude
    fill_in "Postal code", with: @address.postal_code
    fill_in "Region", with: @address.region
    click_on "Create Address"

    assert_text "Address was successfully created"
    click_on "Back"
  end

  test "should update Address" do
    visit address_url(@address)
    click_on "Edit this address", match: :first

    fill_in "Attention", with: @address.attention
    fill_in "City", with: @address.city
    fill_in "Country", with: @address.country
    fill_in "Customer", with: @address.customer_id
    fill_in "Full address", with: @address.full_address
    fill_in "Latitude", with: @address.latitude
    fill_in "Line 1", with: @address.line_1
    fill_in "Line 2", with: @address.line_2
    fill_in "Line 3", with: @address.line_3
    fill_in "Line 4", with: @address.line_4
    fill_in "Longitude", with: @address.longitude
    fill_in "Postal code", with: @address.postal_code
    fill_in "Region", with: @address.region
    click_on "Update Address"

    assert_text "Address was successfully updated"
    click_on "Back"
  end

  test "should destroy Address" do
    visit address_url(@address)
    click_on "Destroy this address", match: :first

    assert_text "Address was successfully destroyed"
  end
end
