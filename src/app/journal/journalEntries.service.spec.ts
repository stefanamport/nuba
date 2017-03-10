import { JournalEntriesService } from './journalEntries.service';

describe('JournalEntriesService', () => {
  let service: JournalEntriesService;
  let firebaseService: any;

  beforeEach(() => {
    service = new JournalEntriesService(firebaseService);
  });

  it('should create JournalEntriesService', () => {
    expect(service).toBeTruthy();
  });
});
