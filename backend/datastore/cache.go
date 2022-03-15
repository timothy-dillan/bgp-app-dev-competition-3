package datastore

import (
	"time"

	"github.com/allegro/bigcache/v3"
)

var Cache *bigcache.BigCache

func InitializeCache(ttl time.Duration) error {
	var err error
	Cache, err = bigcache.NewBigCache(bigcache.DefaultConfig(ttl))
	if err != nil {
		return err
	}
	return nil
}
