//Random Quote JS
//
var randomquote = document.getElementById('randomquote');

var randomQuoteAll = ['&quot;Anything worth doing, is worth doing poorly... because doing it poorly is better than not doing it at all.&quot; &ndash; Joachim DePosada', '&quot;Everytime someone steps up and says who they are, the world becomes a better, more interesting place.&quot; &ndash; Raymond Holt', 'He too concludes that all is well. This universe henceforth without a master seems to him neither sterile nor futile. Each atom of that stone, each mineral flake of that night filled mountain, in itself forms a world. The struggle itself toward the heights is enough to fill a man&apos;s heart.&quot; &ndash; Sisyphus', '&quot;Learn from everyone. Follow no one. Watch for patterns. Work like hell.&quot; &ndash; Scott McCloud', '&quot;You are more than the sum of your worst mistakes.&quot; &ndash; Raubahn', '&quot;Live your life, have no regrets, strive forward no matter the darkness. Even if everything has an end, that doesnt mean your life is meaningless.&quot; &ndash; Hyedalyn', '&quot;With a dream in your heart, your never alone.&quot; &ndash; Dionne Warwick', '&quot;The axe forgets what the tree remembers.&quot; &ndash; Ancient African Proverb', '&quot;In Life as in Games, progress is the point.&quot; &ndash; The Flying Spaghetti Monster', '&quot;Be excellent to each other!&quot; &ndash; Bill & Ted', '&quot;Cease trying to work everything out with your minds. It will get you nowhere. Live by intuition and inspiration and let your whole life be revelation.&quot; &ndash; Eileen Caddy', '&quot;Til our last moment, the future is what we make it.&quot; &ndash; Captain Pike', '&quot;Typically no one can know the future in the moment, one can only follow one&rsquo;s instincts and hope the truth will present itself.&quot; &ndash; Spock', '&quot;Don&rsquo;t cling to a mistake just because you spent a lot of time making it.&quot; &ndash; Aubrey de Grey', '&quot;The world works with it&rsquo;s own rules, it&rsquo;s not dependant on your thoughts and wishes. It&rsquo;s narcissim to think differently.&quot; &ndash; Dr. Kurt Boggs', '&quot;Sometimes I dream about flowers, sometimes flowers dream about me.&quot; &ndash; E.L.O 2.0','&quot;The power of focusing on one thing will change your life. Find it. Become obsessed. Do it daily. Make it a habit. Build a system around it. Join a paid community of people who have the same obsession.&quot; &ndash; Tim Denning',
'&quot;All you have is now.&quot; &ndash; Mu','&quot;Infinite possibilities, you just gotta make them real.&quot; &ndash; Mu','&quot;Do what your heart tells you because you don&rsquo;t owe anyone your life.&quot; &ndash; Mu','&quot;What makes a game good? Simple really, sense of accomplishment, cause and effect, people want to know what they do matters. That&rsquo;s what makes people happy.&quot; &ndash; Harry Williams','&quot;Don&rsquo;t fight back. Fight forward.&quot; &ndash; Ola',
'&quot;Success only comes with repetition.&quot; &ndash; Yneffer',];

var ranQot = Math.floor(Math.random()*randomQuoteAll.length);

randomquote.innerHTML = randomQuoteAll[ranQot];









