import { Spinner } from "@heroui/spinner";

export default function Loading() {
    return (
        <div className="flex justify-center items-center vertical-center" style={{ height: 'calc(100vh - 64px)' }}>
            <Spinner label='Loading...' color='secondary' labelColor="secondary" />
        </div>
    )
}