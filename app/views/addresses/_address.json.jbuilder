json.extract! address, :id, :customer_id, :attention, :line_1, :line_2, :line_3, :line_4, :city, :region, :country, :postal_code, :latitude, :longitude, :full_address, :created_at, :updated_at
json.url address_url(address, format: :json)
