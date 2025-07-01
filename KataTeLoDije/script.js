$(document).ready(function() {
    function loadPredictions() {
        const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
        const $list = $('#predictions-list');
        $list.empty();
        predictions.forEach(function(pred, idx) {
            const $li = $('<li></li>');
            $li.html(
                '<span class="eye-btn" style="cursor:pointer; margin-right:8px;" title="View">👁️</span>' +
                pred.text +
                ' <span style="color:#636e72;font-size:0.9em;">(' + pred.date + ')</span>' +
                ' <span class="delete-btn" style="cursor:pointer; margin-left:8px;" title="Delete">🗑️</span>'
            );
            $li.find('.eye-btn').on('click', function() {
                showPredictionModal(pred.text, pred.date);
            });
            $li.find('.delete-btn').on('click', function() {
                deletePrediction(idx);
            });
            $list.append($li);
        });
    }

    function showPredictionModal(text, date) {
        $('#modal-title').text('I predicted that on ' + date);
        $('#modal-prediction-text').text(text);
        $('#prediction-modal').css('display', 'flex');
    }

    function deletePrediction(index) {
        let predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
        predictions.splice(index, 1);
        localStorage.setItem('predictions', JSON.stringify(predictions));
        loadPredictions();
    }

    $('#close-modal').on('click', function() {
        $('#prediction-modal').hide();
    });

    $('#prediction-form').on('submit', function(e) {
        e.preventDefault();
        const text = $('#prediction-input').val().trim();
        const date = $('#date-input').val();
        if (!text || !date) return;
        const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
        const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        predictions.unshift({ text, date: formattedDate });
        localStorage.setItem('predictions', JSON.stringify(predictions));
        $('#prediction-input').val('');
        $('#date-input').val('');
        loadPredictions();
    });

    loadPredictions();
}); 