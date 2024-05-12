import './ChatText.css'

export const SelfText = ({ message }) => {
    return (
        <div className='self'>
            {message}
        </div>
    )
}

export const OthersText = ({ message }) => {
    return (
        <div className='others'>
            {message}
        </div>
    )
}