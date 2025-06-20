export default async function getPastOrders(order) {
  const response = await fetch(`/api/past-orders?page=${order}`);
  const data = await response.json();
  return data;
}
