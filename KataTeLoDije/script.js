$(document).ready(function() {
    function loadPredictions() {
        const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
        const $list = $('#predictions-list');
        $list.empty();
        predictions.forEach(function(pred, idx) {
            const $li = $('<li></li>');
            $li.html(
                '👁️ ' +
                pred.text +
                ' <span style="color:#636e72;font-size:0.9em;">(' + pred.date + ')</span>' +
                ' <span class="delete-btn" style="cursor:pointer; margin-left:8px;" title="Delete">🗑️</span>'
            );
            $li.find('.delete-btn').on('click', function() {
                deletePrediction(idx);
            });
            $list.append($li);
        });
    }

    function deletePrediction(index) {
        let predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
        predictions.splice(index, 1);
        localStorage.setItem('predictions', JSON.stringify(predictions));
        loadPredictions();
    }

    $('#prediction-form').on('submit', function(e) {
        e.preventDefault();
        const text = $('#prediction-input').val().trim();
        const date = $('#date-input').val();
        if (!text || !date) return;
        const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
        // Format date as readable string
        const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        predictions.unshift({ text, date: formattedDate });
        localStorage.setItem('predictions', JSON.stringify(predictions));
        $('#prediction-input').val('');
        $('#date-input').val('');
        loadPredictions();
    });

    loadPredictions();
}); 