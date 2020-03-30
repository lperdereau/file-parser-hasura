module.exports = {
  INSERT_ADDRESS: `mutation ($id: uuid!, $number: numeric!, $street: String!, $type: String!) {
    insert_address(objects: {id: $id, number: $number, street: $street, type: $type}) {
      returning {
        id
      }
    }
  }`,
  INSERT_LIGHT: `mutation ($id: uuid!, $address_id: uuid!, $geo_x: numeric!, $geo_y: numeric!, $label: String!,) {
    insert_light(objects: {address_id: $address_id, geo_x: $geo_x, geo_y: $geo_y, id: $id, label: $label}) {
      returning {
        id
      }
    }
  }`
}