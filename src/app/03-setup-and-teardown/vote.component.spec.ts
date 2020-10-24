import { VoteComponent } from './vote.component';

let component: VoteComponent;
beforeEach(() => {
  component = new VoteComponent();
})

afterEach(() => {
  return 0;
})

describe('VoteComponent', () => {
  it('should increment totalVotes when upvoted', () => {
    component.upVote();

    expect(component.totalVotes).toBe(1);
  });

  it('should decrement totalVotes when downvoted', () => {
    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });
});