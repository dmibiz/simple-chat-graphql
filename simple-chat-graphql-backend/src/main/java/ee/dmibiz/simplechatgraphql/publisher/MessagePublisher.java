package ee.dmibiz.simplechatgraphql.publisher;

import ee.dmibiz.simplechatgraphql.model.Message;
import io.reactivex.BackpressureStrategy;
import io.reactivex.Flowable;
import io.reactivex.Observable;
import io.reactivex.ObservableEmitter;
import io.reactivex.observables.ConnectableObservable;
import org.springframework.stereotype.Component;

@Component
public class MessagePublisher {
    private final Flowable<Message> publisher;

    private ObservableEmitter<Message> emitter;

    public MessagePublisher() {
        Observable<Message> commentUpdateObservable = Observable.create(emitter -> {
            this.emitter = emitter;
        });

        ConnectableObservable<Message> connectableObservable = commentUpdateObservable.share().publish();
        connectableObservable.connect();

        publisher = connectableObservable.toFlowable(BackpressureStrategy.BUFFER);
    }

    public void publish(final Message message) {
        emitter.onNext(message);
    }

    public Flowable<Message> getPublisher() {
        return this.publisher;
    }
}
