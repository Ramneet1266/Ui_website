import MainData from "../component/StoreData/MainData"

export default function StorePage() {
	return (
		<div className="p-10">
			<h1 className="text-2xl font-bold">Store Details</h1>
			<MainData />{" "}
			{/* No need to pass storeId, it will be handled inside MainData */}
		</div>
	)
}
