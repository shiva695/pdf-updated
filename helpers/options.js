module.exports = {
    formate: 'A3',
    orientation: 'portrait',
    border: '2mm',
    header: {
        height: '15mm',
        contents: '<h4 style=" color: blue;font-size:20;font-weight:800;text-align:center;">FITNESS REPORT</h4>'
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