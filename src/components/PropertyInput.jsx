export default function PropertyInput({ renderInput, title }) {
    return (
        <div className="indent" style={{ display: 'flex', alignItems: 'center' }}>
            <h4>{title}</h4>
            <span style={{ flex: 1 }}></span>
            {renderInput}
        </div>
    );
}