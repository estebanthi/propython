

const testPage = () => {

    return <div>
        <span>Ok</span>
    </div>

}

export default testPage

export async function getServerSideProps() {


    return {
        props: {
            error: null
        }
    }
}