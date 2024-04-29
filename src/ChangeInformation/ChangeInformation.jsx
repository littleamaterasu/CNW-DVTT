import Header from "../Components/Header/Header"

function ChangeInformation() {
    const SubmitInfo = async () => {
        // API
    }

    return (
        <div>
            <Header />
            <form onSubmit={SubmitInfo}>
                <input type="text" placeholder="Tên người dùng" />
                <input type="submit" />
            </form>
        </div>

    )
}
export default ChangeInformation