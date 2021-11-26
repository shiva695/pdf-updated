module.exports = {
    format: 'A4',
    orientation: 'portrait',
    border: '5mm',
    header: {
        height: '12mm',
        contents: '<h4 style=" color: blue;font-size:20;font-weight:800;text-align:center;">Assessment Report</h4>'
    },
    footer: {
        height: '20mm',
        contents: {
            first: 'Cover page',
            2: 'Second page',
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', 
            last: 'Last Page'
        }
    }
}