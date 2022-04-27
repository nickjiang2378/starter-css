export default function StandardLayout({ sx, begin, middle, endIcon }) {
    return (
        <div style={{ ...sx, display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
                {begin}
            </div>
            <div style={{ flex: 1 }}>
                {middle}
            </div>
            <div className="icon-placeholder">
                {endIcon}
            </div>
        </div>
    );
}