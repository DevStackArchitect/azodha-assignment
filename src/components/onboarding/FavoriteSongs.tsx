import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateFavoriteSongs } from '@/store/slices/onboardingSlice';
import { FavoriteSong } from '@/types';
import { Button, Input, Footer } from '@/components/shared';
import { showSuccessToast } from '@/utils/toast';
import styles from '@/styles/module/favorite-songs.module.scss';

interface FavoriteSongsProps {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  showNavigation?: boolean;
  buttonText?: string;
}

const FavoriteSongs: React.FC<FavoriteSongsProps> = ({
  onNext,
  onBack,
  onSkip,
  showNavigation = true,
  buttonText = 'Finalize My Library',
}) => {
  const dispatch = useAppDispatch();
  const { favoriteSongs } = useAppSelector((state) => state.onboarding);

  const [songs, setSongs] = useState<FavoriteSong[]>(favoriteSongs.songs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSong, setNewSong] = useState({ title: '', artist: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleAddTrack = () => {
    if (!newSong.title || !newSong.artist) {
      setError('Please enter both song title and artist name');
      return;
    }

    const song: FavoriteSong = {
      id: Date.now().toString(),
      title: newSong.title,
      artist: newSong.artist,
    };

    setSongs([...songs, song]);
    setNewSong({ title: '', artist: '' });
    setShowAddForm(false);
    setSearchQuery('');
    setError('');
    showSuccessToast(`Added "${newSong.title}" to your favorites! 🎵`);
  };

  const handleRemoveSong = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const handleSubmit = () => {
    if (songs.length < 1) {
      setError('Please add at least one favorite track');
      return;
    }

    dispatch(updateFavoriteSongs({ songs }));
    showSuccessToast('Your music library has been saved! 🎶');
    if (onNext) {
      onNext();
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content */}
      <div className={styles.content}>
        {/* Title */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Your Sound, Your Space</h1>
          <p className={styles.description}>
            Add at least one of your favorite tracks to help us calibrate
            <br />
            your Premium Clarity experience.
          </p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchWrapper}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#8E8E93"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowAddForm(true)}
              className={styles.searchInput}
              placeholder="Search for a song or artist..."
            />
            <Button
              type="button"
              variant="primary"
              size="medium"
              fullWidth={false}
              onClick={() => setShowAddForm(true)}
              className={styles.addButton}
            >
              Add Track
            </Button>
          </div>
        </div>

        {/* Add Track Form */}
        {showAddForm && (
          <motion.div
            className={styles.addForm}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={styles.formTitle}>Add New Track</h3>
            <div className={styles.formFields}>
              <Input
                id="songTitle"
                name="songTitle"
                type="text"
                label="Song Title"
                placeholder="e.g., Midnight City"
                value={newSong.title}
                onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
              />
              <Input
                id="artistName"
                name="artistName"
                type="text"
                label="Artist Name"
                placeholder="e.g., M83"
                value={newSong.artist}
                onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
              />
              <div className={styles.formButtons}>
                <Button
                  type="button"
                  variant="primary"
                  size="medium"
                  onClick={handleAddTrack}
                  className={styles.submitButton}
                >
                  Add
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="medium"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewSong({ title: '', artist: '' });
                    setError('');
                  }}
                  className={styles.cancelButton}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className={styles.errorMessage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Songs List */}
        <div className={styles.songsList}>
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              className={styles.songItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Album Art Placeholder */}
              <div className={styles.albumArt}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 16.5C9.52 16.5 7.5 14.48 7.5 12C7.5 9.52 9.52 7.5 12 7.5C14.48 7.5 16.5 9.52 16.5 12C16.5 14.48 14.48 16.5 12 16.5ZM12 10C10.62 10 9.5 11.12 9.5 12.5C9.5 13.88 10.62 15 12 15C13.38 15 14.5 13.88 14.5 12.5C14.5 11.12 13.38 10 12 10Z"
                    fill="#636366"
                  />
                </svg>
              </div>

              {/* Song Info */}
              <div className={styles.songInfo}>
                <p className={styles.songTitle}>{song.title}</p>
                <p className={styles.songArtist}>{song.artist}</p>
              </div>

              {/* Remove Button */}
              <Button
                type="button"
                variant="text"
                size="small"
                fullWidth={false}
                onClick={() => handleRemoveSong(song.id)}
                className={styles.removeButton}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                iconPosition="left"
              >
                <span style={{ display: 'none' }}>Remove</span>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {songs.length === 0 && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12Z"
                fill="#48484A"
              />
            </svg>
            <p className={styles.emptyText}>Add more tracks to refine your profile</p>
          </motion.div>
        )}

        {/* Finalize Button */}
        <Button
          type="button"
          variant="primary"
          size="large"
          fullWidth
          onClick={handleSubmit}
          showHoverArrow
          className={styles.finalizeButton}
        >
          {buttonText}
        </Button>

        {/* Navigation Links */}
        {showNavigation && (
          <>
            <div className={styles.navigation}>
              <Button
                type="button"
                variant="text"
                size="medium"
                fullWidth={false}
                onClick={onBack}
                className={styles.navButton}
              >
                Back
              </Button>
              <span className={styles.divider}>|</span>
              <Button
                type="button"
                variant="text"
                size="medium"
                fullWidth={false}
                onClick={onSkip}
                className={styles.navButton}
              >
                Skip
              </Button>
            </div>

            {/* Footer */}
            <Footer text="PREMIUM CLARITY © 2024 · FOCUSED EXPERIENCE" className={styles.footer} />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default FavoriteSongs;
